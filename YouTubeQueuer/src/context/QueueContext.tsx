/* eslint-disable @typescript-eslint/no-unused-vars */

import { createContext, useContext, useEffect, useState } from "react";

import { getActiveQueues } from "../services/apiFajita";
import toast from "react-hot-toast";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

interface QueueContextType {
  connectToQueue: (id: number) => void;
  getQueueID: () => number;
  getQueueOwner: () => string;
}

const QueueContext = createContext<QueueContextType>({
  connectToQueue: (id: number) => {},
  getQueueID: () => -1,
  getQueueOwner: () => ""
})

const QueueProvider = ({children} : {children: React.ReactNode}) => {
  const [queue, setQueue] = useLocalStorageState("", "queue");
  const [queueId, setID] = useState(-1);
  const [queueOwner, setOwner] = useState("");

  useEffect( () => {
    const checkQueues = async () => {
      const queues = await getActiveQueues();
      if (queues.length == 1)
      {
        connectToQueue(queues[0].id);
      }
    }
    
    const checkIfQueueIsActive = async (targetID: number) => {
      const queues = await getActiveQueues();
      const isActive = queues.some( (obj) => obj.id == targetID );
      if (!isActive)
      {
        toast.error("Selected queue is not active");
        setID(-1);
        setOwner("");
      } else {
        toast.success("Connected to Queue");
      }
    }

    if (queue)
    {
      const queueObject = JSON.parse(queue);
      setID( queueObject.id);
      setOwner( queueObject.owner.first_name);
      
      // Is this queue still active?
      checkIfQueueIsActive(queueObject.id);
    } else {
      checkQueues();
    }

  }, [queue])


  // Functions to Export
  const connectToQueue = async (id: number) => {
    const queues = await getActiveQueues();
    const targetQueue = queues.find( (obj) => obj.id == id);

    if (!targetQueue)
    {
      toast.error("Error connecting to queue");
      return;
    }

    setQueue(JSON.stringify(targetQueue));
  }

  const getQueueID = () : number => {
    return queueId;
  }

  const getQueueOwner = () : string => {
    return queueOwner;
  }

  return (
    <QueueContext.Provider value={{connectToQueue, getQueueID, getQueueOwner}}>
      {children}
    </QueueContext.Provider>
  )
}

const useQueueProvider = () => {
  const context = useContext(QueueContext);
  if (context === undefined) throw new Error("QueueContext was used outside of QueueProvider");
  return context;
}

export { QueueProvider, useQueueProvider };