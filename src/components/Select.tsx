interface Options {
    label: string,
    value: string | number
}

interface Props {
    className?: string,
    defaultValue?: Options['value'],
    options: Options[],
    onChange: React.ChangeEventHandler
}

const Select: React.FC<Props> = ({ className, defaultValue, options, onChange }) => {
    const renderOptions = options.map(option => {
        const { label, value } = option;
        return <option key={label} value={value}>{label}</option>
    })

    return <select className={className} onChange={onChange} defaultValue={defaultValue}>
        {renderOptions}
    </select>
}

export default Select;
