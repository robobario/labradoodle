import {useState} from 'react'
import './App.css'
import Example from "./Example.jsx";
import {stringify} from 'yaml'

function App() {
    const [examples, setExamples] = useState([{
        "id": 0,
        "question": "Tell me a pun about birds.",
        "answer": "Why do birds eat wood?\n\n    Because they're peckish!",
        "context": "any old context"
    }])
    const [active, setActive] = useState(0)
    const [createdBy, setCreatedBy] = useState("yourusername")
    const [taskDescription, setTaskDescription] = useState("task description")
    const [contextMode, setContextMode] = useState(false)

    function update(example) {
        const temp = examples.map(x => x.id === example.id ? example : x)
        setExamples(temp);
    }

    function yamlize() {
        const to_write = {created_by: createdBy, task_description: taskDescription}
        to_write["seed_examples"] = examples.map(value => {
            let ex = {"question": value.question, "answer": value.answer};
            if (contextMode) {
                ex["context"] = value.context
            }
            return ex
        })
        return stringify(to_write, {lineWidth: 110, defaultStringType: "QUOTE_DOUBLE"});
    }

    function b64string() {
        const yaml = yamlize();
        return btoa(yaml);
    }

    function addExample() {
        const temp = examples.map(x => x)
        let newId = Math.max(...examples.map(x => x.id), 0) + 1;
        temp.push({
            "id": newId,
            "question": "what is the time?",
            "answer": "it is time for second breakfast",
            "context": "any old context"
        })
        setExamples(temp);
        setActive(newId)
    }

    function deleteExample(id) {
        const temp = examples.filter(x => x.id !== id)
        setExamples(temp);
        if (active === id) {
            setActive(0)
        }
    }

    return (
        <>
            <div className="columns">
                <div className="column is-half">
                    <div className="notification is-warning" hidden={!(examples.length < 5)}>Please supply at least 5 examples!</div>
                    <div>
                        <label>created by: </label>
                    <input value={createdBy} onChange={(e) => setCreatedBy(e.target.value)}/>
                    </div>
                    <div>
                        <label>task description: </label>
                        <input value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)}/>
                    </div>
                    <div>
                        <label>context:</label>
                        <input type="checkbox" value={contextMode} onChange={(e) => setContextMode(!contextMode)}/>
                    </div>
                    {
                        examples.map(c => <Example key={c.id}
                                                example={c}
                                                isActive={c.id === active}
                                                onSelect={() => setActive(c.id)}
                                                onChange={(example) => update(example)}
                                                onDelete={() => deleteExample(c.id)}
                                                isContextMode={contextMode}/>)
                    }
                    <a
                        className="button"
                        onClick={addExample}
                    >add</a>
                </div>
                <div className="column is-half">
                    <div className="yamlBox">
                        <pre>{yamlize()}</pre>
                    </div>
                    <a
                        className="button"
                        download="qna.yaml"
                        href={`data:application/pdf;base64,${b64string()}`}
                    >Download</a>
                </div>
            </div>
        </>
    )
}

export default App
