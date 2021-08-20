function showPrev(setDisplay){
  setDisplay((prev)=>{
    return prev -= 1
  })
}

function showNext(setDisplay){
  setDisplay((prev)=>{
    return prev += 1
  })
}

export {showPrev, showNext}