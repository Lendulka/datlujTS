import { useState } from 'react';
import './Select.css'

export interface FormDataStructure {
    count: number;
}

export interface FormProps extends FormDataStructure {
    onSubmitData: (data: FormDataStructure) => void
}

export const Select: React.FC<FormProps> = ({ count, onSubmitData }) => {
    const [selectData, setSelectData] = useState<FormDataStructure>({
        count: count,
    })

    console.log(count)

    const options = []
    for (let i = 2; i < 23; i++) {
        options.push(i + 1)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        let targetValue = Number(e.target.value)
        setSelectData({ ...selectData, count: targetValue })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmitData(selectData)
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <label className="form__label">
                Vyber délku slov
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
            <button className="form__button" type="submit">Potvrdit</button>
        </form>
    )
}

export default Select;


