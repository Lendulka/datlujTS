import { useState } from 'react';
import './Form.css'

export interface FormDataStructure {
    count: number;
    minutes: number;
}

export interface FormProps extends FormDataStructure {
    onSubmitData: (data: FormDataStructure) => void
}

export const Form: React.FC<FormProps> = ({ count, minutes, onSubmitData }) => {
    const [selectData, setSelectData] = useState<FormDataStructure>({
        count: count,
        minutes: minutes,
    })

    console.log(count)

    const options = []
    for (let i = 2; i < 23; i++) {
        options.push(i + 1)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        let targetValue = Number(e.target.value)
        setSelectData({ ...selectData, [e.target.name]: targetValue })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmitData(selectData)
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <label className="form__label">
                Délka slov
                <select
                    className="form__input"
                    name="count"
                    value={selectData.count}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select one</option>
                    {options.map((oneOption) => <option key={oneOption} value={oneOption}>{oneOption}</option>)}
                </select>
            </label>
            <label className="form__label">
                Počet minut
                <select
                    className="form__input"
                    name="minutes"
                    value={selectData.minutes}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select one</option>
                    <option value="2">1</option>
                    <option value="4">4</option>
                    <option value="6">6</option>
                    <option value="8">8</option>
                    <option value="10">10</option>
                </select>
            </label>
            <button className="form__button" type="submit">Nastavit</button>
        </form>
    )
}

export default Form;


