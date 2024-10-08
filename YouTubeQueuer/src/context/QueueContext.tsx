/* eslint-disable @typescript-eslint/no-unused-vars */

import { createContext, useContext, useEffect, useState } from "react";

import { Queue } from "../components/active_queues/hooks/useActiveQueues";
import { getActiveQueues } from "../services/apiFajita";
import toast from "react-hot-toast";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { useUser } from "../components/authentication/hooks/useUser";

interface QueueContextType {
  connectToQueue: (id: number) => void;
  getQueueID: () => number;
  getQueueOwner: () => string;
}

const QueueContext = createContext<QueueContextType>({
  connectToQueue: (id: number) => { return id},
  getQueueID: () => -1,
  getQueueOwner: () => ""
})

const QueueProvider = ({children} : {children: React.ReactNode}) => {
  const [queue, setQueue] = useLocalStorageState("", "queue");
  const {isAuthenticated} = useUser();

  useEffect( () => {
    /*
      Check the Queue Data
        - If it exists, check to see if Queue ID is still active.
          - Connect if it is active
          - Clear Value if it is not active.
        - If it does not exist, check to see if there is a singular queue open
          - If there is a singular queue, connect to it.
    */
    const checkActiveQueue = async (targetID: number) => {
      const queues = await getActiveQueues();
      const isActive = queues.some( (obj:Queue) => obj.id == targetID );
      if (!isActive)
      {
        setQueue("");
      }
    }

    const tryToConnect = async () => {
      const queues = await getActiveQueues();
      if (queues.length == 1)
      {
        connectToQueue(queues[0].id);
      } else {
        toast.error("Cannot auto-connect");
      }
    }
    
    try {
      const queueObject = JSON.parse(queue);
      if (queueObject.id)
      {
        checkActiveQueue(queueObject.id);
      } else {
        tryToConnect();
      }
    } catch (err)
    {
      tryToConnect();
    }
    
  }, [queue])

  // Functions to Export
  const connectToQueue = async (id: number) => {
    const queues = await getActiveQueues();
    const targetQueue = queues.find( (obj: Queue) => obj.id == id);

    if (!targetQueue)
    {
      toast.error("Error connecting to queue");
      return;
    }

    setQueue(JSON.stringify(targetQueue));
    toast.success("Connected");
  }

  const getQueueID = () : number => {
    try {
      const queueObject = JSON.parse(queue);
      return queueObject.id;
    } catch (err)
    {
      return -1;
    }
  }

  const getQueueOwner = () : string => {
    try {
      const queueObject = JSON.parse(queue);
      return queueObject.owner.first_name;
    } catch (err)
    {
      return "";
    }
  }

  if (!isAuthenticated) return;
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