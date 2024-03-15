function Example({example, onChange, isActive, onSelect, onDelete}) {
    return (
        <>
            <div className="box">
                <a onClick={onSelect}>Example #{example.id} </a>
                <a className="button is-small" onClick={onDelete}>Delete</a>
                <div hidden={!isActive}>
                    <div className="field">
                        <label className="label" htmlFor={"question-" + example.id}>Question: </label>
                        <div className="control">
              <textarea className="textarea" id={"question-" + example.id} value={example.question}
                        onChange={(event) => {
                            const tempState = {...example}
                            tempState.question = event.target.value;
                            onChange(tempState)
                        }}></textarea>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label" htmlFor={"answer-" + example.id}>Answer: </label>
                        <div className="control">
              <textarea className="textarea" id={"answer-" + example.id} value={example.answer} onChange={(event) => {
                  const tempState = {...example}
                  tempState.answer = event.target.value;
                  onChange(tempState)
              }}></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Example
