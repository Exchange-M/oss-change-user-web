export const getClassByState = status => {
  if (status === "RISE") return "up"
  else if (status === "FALL") return "down"
  else return "none";
}
export const getCheckBoxByState = status => {
  // console.log('getCheckBoxByState', status)
  if (status === "RISE") return "check-red"
  else if (status === "FALL") return "check-blue"
  else return "check-black";
}

export const getRate = (prev, curr) => {
  let p = parseFloat(prev) 
  let c= parseFloat(curr)
  return ((c - p) / p) / 100
}

export const getPercent = (piece, total) => piece / total * 100