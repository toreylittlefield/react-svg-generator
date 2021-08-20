import React, { useState, useEffect } from 'react';

// eslint-disable-next-line react/prop-types
const Toast = ({ msg, setMsg }) => {
  const [classOpen, setClassOpen] = useState('');
  const [msgLog, setMsgLog] = useState([]);

  useEffect(() => {
    if (!msgLog.length) return;
    const deleteTimer = setInterval(() => {
      setClassOpen('');
      msgLog.splice(0, 1);
      setMsgLog([...msgLog]);
    }, 3000);
    return () => {
      clearInterval(deleteTimer);
    };
  }, [msgLog]);

  useEffect(() => {
    if (!msg) return;
    setMsgLog((prev) => [
      ...prev.filter((el) => el.msg !== msg),
      { id: msgLog.length + Math.random() * 10000, msg },
    ]);
    setClassOpen('open');
    setMsg('');
  }, [msg]);

  return (
    <>
      {msgLog?.map((toast) => (
        <div key={toast.id} className={`toast-message ${classOpen}`}>
          {toast.msg}
        </div>
      ))}
    </>
  );
};

export default Toast;
