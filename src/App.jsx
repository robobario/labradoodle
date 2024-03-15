import {useState} from 'react'
import './App.css'
import Example from "./Example.jsx";
import {stringify} from 'yaml'

function App() {
    const [examples, setExamples] = useState([{
        "id": 0,
        "question": "what is the time?",
        "answer": "it is time for second breakfast"
    }])
    const [active, setActive] = useState(0)
    const [createdBy, setCreatedBy] = useState("yourusername")

    function update(example) {
        const temp = examples.map(x => x)
        temp[example.id] = example;
        setExamples(temp);
    }

    function yamlize() {
        const to_write = {created_by: createdBy, task_description: ""}
        to_write["seed_examples"] = examples.map(value => {
            return {"question": value.question, "answer": value.answer}
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
            "answer": "it is time for second breakfast"
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
                    <div hidden={!(examples.length < 5)}>Please supply at least 5 examples!</div>
                    <input value={createdBy} onChange={(e) => setCreatedBy(e.target.value)}/>
                    {
                        examples.map(c => <Example key={c.id}
                                                example={c}
                                                isActive={c.id === active}
                                                onSelect={() => setActive(c.id)}
                                                onChange={(example) => update(example)}
                                                onDelete={() => deleteExample(c.id)}/>)
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
