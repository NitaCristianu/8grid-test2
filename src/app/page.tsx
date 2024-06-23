"use client";
import { motion } from 'framer-motion';
import { ChangeEvent, useEffect, useRef, useState } from "react"
import useMousePosition from "./hooks/useMousePos";
import useMouseDown from "./hooks/useMouseDown";
import { points, lines, midos, point_type, line_type } from "./data/elements";


const distance = (a: point_type, b: point_type) => Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));

const onPoint = (point: point_type, mouse_pos: point_type) => distance(point, mouse_pos) <= 30;
export default function Home() {
  
  const canvas = useRef(null);
  
  const mouse_pos = useMousePosition();
  const mouse_down = useMouseDown();
  const [leni, set_leni] = useState<boolean>(false);
  const [lobi, set_lobi] = useState<boolean>(false);
  const [start, set_start] = useState<null | point_type>(null);
  const [selected, set_selected] = useState<null | point_type>(null);
  const [text, set_text] = useState("bambilici");
  const[colori, set_colori] = useState("indianred");
  useEffect(() => {
    if (leni && mouse_down == 0) {
      set_leni(false);
      points.push({
        x: mouse_pos.x,
        y: mouse_pos.y,
        tag: "l",
      })
    }

    const ctx = (canvas.current as HTMLCanvasElement | null)?.getContext('2d');
    if (!ctx) return;


    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, innerWidth, innerHeight);


    points.forEach(point => {
      if (lobi && mouse_down == 0 && onPoint(point, mouse_pos)) {
        if (start == null) {
          set_start(point)
        }
        else if (start != null) {
          lines.push(
            {
              start: start,
              end: point,
            }
          )
          set_start(null);
          set_lobi(false);
        }
      }
    });
    if (start != null && lobi) {
      ctx.beginPath();
      ctx.strokeStyle = "indianred";
      ctx.lineWidth = 10;
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(mouse_pos.x, mouse_pos.y);
      ctx.stroke();
      ctx.closePath();
    }
    if (leni) {
      ctx.beginPath();
      ctx.strokeStyle = "white";
      ctx.fillStyle = "white";
      ctx.lineWidth = 2;
      ctx.arc(mouse_pos.x, mouse_pos.y, 30, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
      ctx.beginPath();
      ctx.strokeStyle = "white";
      ctx.fillStyle = "white";
      ctx.lineWidth = 2;
      ctx.arc(mouse_pos.x, mouse_pos.y, 35, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.closePath();

    }
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      ctx.beginPath();
      ctx.strokeStyle = "indianred";
      ctx.lineWidth = 10;
      ctx.moveTo(line.start.x, line.start.y);
      ctx.lineTo(line.end.x, line.end.y);
      ctx.stroke();
      ctx.closePath();
    }
    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      var color = "white";

      if (onPoint(point, mouse_pos) && mouse_down == 0)
        set_selected(point);

      ctx.beginPath();
      ctx.strokeStyle = point.color || color;
      ctx.fillStyle = "rgb(20,20,20)";
      ctx.lineWidth = 4;
      ctx.arc(point.x, point.y, 30, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "white";
      ctx.font = "bold 32px Arial";
      ctx.fillText(point.tag || "", point.x - 11, point.y + 10);
      ctx.closePath();

    }
    for (let i = 0; i < midos.length; i++) {
      const mido = midos[i];
      ctx.beginPath();
      ctx.strokeStyle = "gold";
      ctx.fillStyle = "rgb(20,20,20)";
      ctx.lineWidth = 4;
      ctx.arc((mido.p1.x + mido.p2.x) / 2, (mido.p1.y + mido.p2.y) / 2, 30, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "white";
      ctx.font = "bold 32px Arial";
      ctx.fillText(mido.tag, (mido.p1.x + mido.p2.x) / 2 - 11, (mido.p1.y + mido.p2.y) / 2 + 10);
      ctx.closePath();
    }

    if (mouse_down == -1)
      set_selected(null);

      if (selected && mouse_down == 0) {
        // avem un punct selectat
        selected.x = mouse_pos.x;
        selected.y = mouse_pos.y;
        selected.tag = text;
        selected.color = colori;
      }

  }, [mouse_pos, mouse_down])
  return <>
    <canvas
      ref={canvas}
      width={innerWidth}
      height={innerHeight}
    />
    {<div
      style={{
        width: innerWidth * 1 / 2,
        height: innerHeight,
        position: 'fixed',
        left: innerWidth * 0.5,
        top: 0,
      }}

    >

      <input
        type={'text'}
        
  
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          set_text(event.target.value);
        }}
        
  
      />
      <input
        type={'color'}
        
  
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          set_colori(event.target.value);
        }}
        
  
      />
      
    </div>}
    <div
      style={{
        position: 'fixed',
        top: 25,
        left: 25,
        width: '20%',
        height: '10%',
        zIndex: 1,
        display: 'flex',
        justifyContent: 'flex-start',
        gap: 32,
      }}
    >
      <motion.button
        whileHover={{ scale: 0.95 }}
        whileTap={{ scale: 1.05 }}
        style={{
          height: '100%',
          aspectRatio: 1,
          borderRadius: '100%',
          color: "white",
          background: "rgb(25,25,25)",
          font: "bold 16px Arial",
          border: '2px solid rgb(50, 100, 250)',
          boxShadow: "5px 5px 15px rgba(50, 100, 250, 0.5)"
        }}

        onClick={() => {
          set_leni(true)
        }}
      >+ Circle</motion.button>
      <motion.button
        whileHover={{ scale: 0.95 }}
        whileTap={{ scale: 1.05 }}
        style={{
          height: '100%',
          aspectRatio: 1,
          borderRadius: '100%',
          color: "white",
          background: "rgb(25,25,25)",
          font: "bold 16px Arial",
          border: '2px solid rgb(250, 30, 50)',
          boxShadow: "5px 5px 15px rgba(250, 30, 50, 0.3)"
        }}
        onClick={() =>
          set_lobi(true)
        }
      >+ Line</motion.button>
    </div>
  </>
}
