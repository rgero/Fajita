import { Box, Container, Divider, Typography } from "@mui/material";
import { DndContext, PointerSensor, closestCenter, useSensor, useSensors, type DragEndEvent} from "@dnd-kit/core";
import {SortableContext, arrayMove, useSortable, verticalListSortingStrategy} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import EmptyQueue from "./EmptyQueue";
import { Interaction } from '@interfaces/Interaction';
import QueueCard from "./QueueCard";
import Spinner from "../ui/Spinner";
import { useQueueContext } from '@context/queue/QueueContext';
import { useSocketProvider } from "@context/websocket/WebsocketContext";

interface SortableQueueItemProps {
  entry: Interaction;
  current: number;
  isScrollTarget: boolean;
  scrollRef: React.RefObject<HTMLElement | null>;
}

const SortableQueueItem: React.FC<SortableQueueItemProps> = ({ entry, current, isScrollTarget, scrollRef }) => {
  const isCurrentItem = entry.index === current;
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: entry.id,
    disabled: isCurrentItem,
  });

  return (
    <Box
      ref={setNodeRef}
      sx={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.7 : 1,
      }}
      {...attributes}
      {...listeners}
    >
      <Box
        sx={{
          paddingBottom: { xs: 1 },
        }}
        id={`${entry.index}`}
        ref={isScrollTarget ? scrollRef : null}
      >
        <QueueCard current={current} data={entry} />
        <Divider />
      </Box>
    </Box>
  );
};

const QueueList = () => {
  const {isLoading, queueData, error} = useQueueContext();
  const { reorderQueue } = useSocketProvider();
  const {current_index, interactions} = queueData;
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [targetIndex, setTargetIndex] = useState<number>(-1);
  const [orderedInteractions, setOrderedInteractions] = useState<Interaction[]>([]);

  const scrollToRef = useRef<HTMLElement>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // This is for setting the current Index and scrolling
  useEffect(()=> { 
    const calculateTargetIndex = () => {
      if (Object.keys(queueData).length === 0) return;
      const currentIndex:number = queueData.current_index;
      const foundItems:Interaction[] = queueData.interactions.filter((option: Interaction) =>{
        return option.index == currentIndex;
      })
      
      if (foundItems.length == 1)
      {
        const tIndex: number = queueData.interactions.indexOf(foundItems[0]) - 1;
        const target: Interaction = queueData.interactions[tIndex];
        if (target == undefined) return;
        setTargetIndex( () => queueData.interactions[tIndex].index );
      }
    }

    setCurrentIndex( () => current_index);
    calculateTargetIndex();
  }, [queueData, current_index]);

  useEffect(() => {
    setOrderedInteractions(interactions || []);
  }, [interactions]);


  // This is for the scrolling.
  useEffect( () => {
    if( scrollToRef.current ) {
      scrollToRef.current.scrollIntoView({behavior: 'smooth'})
    }
  }, [currentIndex]);

  if(isLoading) return (<Spinner/>)
  if (!interactions || interactions.length == 0)
  {
    return (
      <EmptyQueue/>
    )
  }

  if (error)
  {
    return (
      <Container>
        <Typography>An error has occurred. Oops.</Typography>
      </Container>
    )
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = orderedInteractions.findIndex((item: Interaction) => item.id === active.id);
    const newIndex = orderedInteractions.findIndex((item: Interaction) => item.id === over.id);

    if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) {
      return;
    }

    const activeInteraction = orderedInteractions[oldIndex];
    if (activeInteraction.index === currentIndex) {
      return;
    }

    const reorderedInteractions = arrayMove(orderedInteractions, oldIndex, newIndex);
    const movedInteraction = reorderedInteractions[newIndex];
    const previousInteraction = newIndex > 0 ? reorderedInteractions[newIndex - 1] : null;
    const nextInteraction = newIndex < reorderedInteractions.length - 1 ? reorderedInteractions[newIndex + 1] : null;

    try {
      setOrderedInteractions(reorderedInteractions);
      reorderQueue(movedInteraction.id, previousInteraction?.id || null, nextInteraction?.id || null);
    } catch {
      toast.error("Failed to reorder queue item");
      setOrderedInteractions(interactions || []);
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={orderedInteractions.map((entry: Interaction) => entry.id)} strategy={verticalListSortingStrategy}>
        <Box>
          {
            orderedInteractions.map((entry: Interaction) => (
              <SortableQueueItem
                key={entry.id}
                entry={entry}
                current={currentIndex}
                isScrollTarget={entry.index === targetIndex}
                scrollRef={scrollToRef}
              />
            ))
          }
        </Box>
      </SortableContext>
    </DndContext>
  )
}

export default QueueList
