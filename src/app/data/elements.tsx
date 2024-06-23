export interface point_type {
  x: number,
  y: number,
  tag?: string,
  color? : string
}

export interface line_type {
    start : point_type,
    end : point_type
}

export const points : point_type[] = [
    {
        x: innerWidth / 2 - 200,
        y: innerHeight / 2,
        tag: "A",
        color : 'red',
    },
    {
        x: innerWidth / 2,
        y: innerHeight / 2,
        tag: "B",
        color : 'blue',
    },
    {
        x: innerWidth / 2 + 200,
        y: innerHeight / 2,
        tag: "C",
        color : 'green',
    },
]

export const lines : line_type[] = [
    
]
export const midos = 
[
     {
        p1 : points[0],
        p2 : points[1],
        tag : "D"
     }
]