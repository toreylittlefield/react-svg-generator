import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import PropTypes from 'prop-types';
import chroma from 'chroma-js';

const Toast = ({ msg, setMsg }) => {
  const [classOpen, setClassOpen] = useState('');
  const [msgLog, setMsgLog] = useState([]);
  const [animate, setAnimate] = useState({ parent: '', child: '' });
  let parent = useRef(null);
  let child = useRef(null);
  const selector = gsap.utils.selector(child);

  // store the timeline in a ref.
  const tl = useRef();

  useEffect(() => {
    if (!msgLog.length) return;
    const deleteTimer = setInterval(() => {
      setClassOpen('');
      msgLog.splice(0, 1);
      setMsgLog([...msgLog]);
    }, 5000);
    return () => {
      clearInterval(deleteTimer);
    };
  }, [msgLog]);

  useEffect(() => {
    if (!msg) return;
    setMsgLog((prev) => [
      ...prev.filter((toastmsg) => toastmsg.msg !== msg),
      {
        id: `toast-${msgLog.length + Math.ceil(Math.random() * 10000)}`,
        msg,
      },
    ]);
    setClassOpen('open');
    setMsg('');
  }, [msg]);

  const handleClose = (e) => {
    parent = e.currentTarget.parentElement;
    child = e.currentTarget;
    setAnimate({ parent, child });
  };

  const animateSVGElements = (
    gsapTimeLine = {},
    elementTagName,
    duration = Number
  ) => {
    const pathLength = selector(elementTagName)[0].getTotalLength();
    gsapTimeLine
      .from(
        selector(elementTagName),
        {
          // stroke: 'white',
          strokeWidth: 0,
          stroke: chroma.brewer.Spectral[10],
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
          duration,
        },
        '-=.3'
      )
      .to(selector(elementTagName), {
        rotate: 180,
        strokeWidth: 2,
        transformOrigin: 'center center',
        stroke: chroma.brewer.Spectral[0],
        duration,
        strokeDashoffset: 0,
      });
    return gsapTimeLine;
  };

  useEffect(() => {
    if (!parent.current) return;
    const { parent: p, child: ch } = animate;
    const colorsChroma = chroma
      .scale(['#fafa6e', '#2A4858'])
      .mode('lch')
      .colors(6);
    const colorCh =
      colorsChroma[Math.floor(Math.random() * colorsChroma.length)];
    const colorP =
      colorsChroma[Math.floor(Math.random() * colorsChroma.length)];
    gsap.set(p, {
      animation: 'none',
      autoAlpha: 1,
      perspective: 600,
      transformStyle: 'preserve-3d',
      cursor: 'none',
      touchAction: 'none',
    });
    gsap.set(ch, { cursor: 'none', touchAction: 'none' });
    tl.current = gsap
      .timeline()
      .to(
        ch,
        {
          duration: 0.3,
          transform: `translate(-50%, -50%)`,
          scale: 2,
          rotate: 720,
          fill: chroma.blend(colorCh, colorP, 'lighten'),
        },
        0
      )
      .to(
        p,
        {
          duration: 0.3,
          fontSize: 0,
          borderRadius: '50%',
          ease: 'power3.in',
          backgroundColor: colorP,
        },
        0.2
      );
    animateSVGElements(tl.current, '#close-x-one', 0.3);
    animateSVGElements(tl.current, '#close-x-two', 0.3);
    animateSVGElements(tl.current, '#close-circle', 0.3);
    tl.current.to(p, {
      translateY: -900,
    });
    return () => {
      tl.current.kill();
    };
  }, [animate]);

  return (
    <>
      {msgLog?.map((toast) => (
        <div
          ref={parent}
          id={toast.id}
          key={toast.id}
          className={`toast-message ${classOpen}`}
        >
          {toast.msg}
          <svg
            onClick={handleClose}
            id={`svg-${toast.id}`}
            ref={child}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-x-circle"
          >
            <circle id="close-circle" cx="12" cy="12" r="10" />
            <line id="close-x-one" x1="15" y1="9" x2="9" y2="15" />
            <line id="close-x-two" x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </div>
      ))}
    </>
  );
};

export default Toast;

Toast.propTypes = {
  msg: PropTypes.string.isRequired,
  setMsg: PropTypes.func.isRequired,
};
