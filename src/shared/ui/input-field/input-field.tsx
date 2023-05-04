import clsx from 'clsx'
import { ChangeEvent, ReactNode, useState } from 'react'
import { EyeCloseIcon, EyeOpenIcon } from 'shared/assets/icons'
import styles from './input-field.module.scss'

interface InputFieldProps {
    value?: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    onSubmit?: () => void
    onClickButton?: () => void
    icon?: ReactNode
    type?: 'search' | 'password' | 'text'
    name?: string
    placeholder?: string
    className?: string
    width?: string
    pattern?: string
}

export const InputField = ({
    value,
    icon,
    onChange,
    onSubmit,
    onClickButton,
    type = 'text',
    name,
    placeholder,
    className,
    width,
    pattern,
}: InputFieldProps) => {
    return (
        <div className={clsx(styles.field, className)} style={{ maxWidth: width }}>
            <input
                pattern={pattern}
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                onKeyDown={(event) => {
                    if (!onSubmit || event.code !== 'Enter') return
                    onSubmit()
                }}
            />
            <button type="button" onClick={onClickButton ? onClickButton : onSubmit}>
                {icon}
            </button>
        </div>
    )
}

export const PasswordFiled = ({
    onChange,
    value,
    placeholder,
    name,
    width,
}: Pick<InputFieldProps, 'onChange' | 'value' | 'placeholder' | 'name' | 'width'>) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <InputField
            width={width}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            type={isOpen ? 'text' : 'password'}
            onClickButton={() => setIsOpen(!isOpen)}
            icon={!isOpen ? <EyeOpenIcon /> : <EyeCloseIcon />}
        />
    )
}
