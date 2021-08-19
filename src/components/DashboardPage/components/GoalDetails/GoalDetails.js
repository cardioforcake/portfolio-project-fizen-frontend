
function GoalDetails(props){
  return(
    <div>
      details
      <p>{props.goal.title}</p>
      <p>{props.goal.targetAmount}</p>
    </div>
  )
}

export default GoalDetails