type PageProps = {
  numPlayers: number,
  setNumPlayers: (arg: number) => void
}

const GroupSizePage = ({ numPlayers, setNumPlayers }: PageProps) => {
  const increment = () => {
    setNumPlayers(numPlayers + 1)
  }

  const decrement = () => {
    setNumPlayers(numPlayers - 1)
  }

  return (
    <>
      <h1>How Big Is Your Group?</h1>
      <div className='input-box'>
        {numPlayers > 1 && 
          <span className='input-btn decrementer' onClick={decrement}>-</span>
        }
        <h3 className='num-players'>{numPlayers}</h3>
        <span className='input-btn incrementer' onClick={increment}>+</span>
      </div>
    </>
  )
}

export default GroupSizePage