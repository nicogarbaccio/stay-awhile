'use client';

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

// Define the "CounterProps" interface for the component's props
interface CounterProps {
    title: string;
    subtitle: string;
    value: number;
    onChange: (value: number) => void;
}

// Create the "Counter" functional component with "CounterProps"
const Counter: React.FC<CounterProps> = ({ title, subtitle, value, onChange }) => {
    // Create a memoized "onAdd" function to increment the counter value
    const onAdd = useCallback(() => {
        onChange(value + 1);
    }, [onChange, value])

    // Create a memoized "onReduce" function to decrement the counter value
    const onReduce = useCallback(() => {
        if (value === 1) {
            return;
        }
        onChange(value - 1);
    }, [value, onChange])

    // Render the component
    return (
        <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col">
                <div className="font-medium">
                    {title}
                </div>
                <div className="font-light text-gray-600">
                    {subtitle}
                </div>
            </div>
            <div className="flex flex-row items-center gap-4">
                <div onClick={onReduce} // Attach the "onReduce" function to the onClick event
                className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition">
                <AiOutlineMinus />
                </div>
                <div className="font-light text-xl text-neutral-600">
                    {/* Display the current counter value */}
                    {value}
                </div>
                <div onClick={onAdd} // Attach the "onAdd" function to the onClick event
                className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition">
                <AiOutlinePlus />
                </div>
            </div>
        </div>
    )
}

export default Counter;