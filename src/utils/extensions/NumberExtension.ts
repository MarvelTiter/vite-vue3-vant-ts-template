const ratio = window.devicePixelRatio || 1

Number.prototype.actualPixel = function(): number {  
    return ratio * (Number(this))
}
  
export {}
