import React, { useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import { useHistory, useLocation } from 'react-router-dom'
import classnames from 'classnames'

import './Setup.css'

export const OPTIONS = {
    age: [
        { value: 1, label: 'Under 30' },
        { value: 2, label: '30 - 60' },
        { value: 3, label: '60 plus' },
    ],
    gender: [
        { value: 4, label: 'Man' },
        { value: 5, label: 'Woman' },
        { value: 6, label: 'Random' },
    ],
}

const Selector = ({ label, options, onSelect, selected }) => (
    <div className="selector">
        <p>{label}</p>
        <div className="options">
            {options.map((option) => (
                <div
                    className={classnames({
                        option,
                        selected: option.value === selected,
                    })}
                    key={option.value}
                    onClick={() => onSelect(option)}
                >
                    {option.label}
                </div>
            ))}
        </div>
    </div>
)

export default function Setup() {
    const history = useHistory()
    const location = useLocation()
    const [name, setName] = useState('')
    const [options, setOptions] = useState({ age: null, gender: null })

    const onChange = (evt) => setName(evt.target.value)

    const { details } = location.state || {}
    return (
        <div className="wrapper" id="setup">
            {!details?.name && (
                <Input
                    label="My name is"
                    placeholder="What's your name?"
                    value={name}
                    onChange={onChange}
                />
            )}
            <div className="content">
                <h1 className="heading">I would like to fika with...</h1>
                <Selector
                    label="Someone around this age"
                    options={OPTIONS.age}
                    onSelect={(age) => setOptions({ ...options, age })}
                    selected={options.age?.value}
                />
                <Selector
                    label="Preferably with a"
                    options={OPTIONS.gender}
                    onSelect={(gender) => setOptions({ ...options, gender })}
                    selected={options.gender?.value}
                />
            </div>
            <Button
                disabled={
                    !options.age?.value ||
                    !options.gender?.value ||
                    !(name || details?.name)
                }
                text="Find a buddy"
                onClick={() =>
                    history.push('/match', { name: name || details.name })
                }
            />
        </div>
    )
}
