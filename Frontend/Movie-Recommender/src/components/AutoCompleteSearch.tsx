import { Input, InputGroup, InputLeftElement, List, ListItem } from '@chakra-ui/react'
import { BsSearch } from 'react-icons/bs'
import ThemedBorderedBox from './ThemedBorderedBox'
import {useEffect, useRef, useState} from 'react'

interface Props{
    items: string[],
    placeholderText?: string,
    onSelect: (item: string) => void,
    onSearch: (value: string) => void,
    onInputChange: (value: string) => void
}

const AutoCompleteSearch = ({items, placeholderText, onSelect, onSearch, onInputChange} : Props) => {
    const [isVisible, setIsVisible] = useState(false)
    const [value, setValue] = useState('')
    const [debouncedValue, setDebouncedValue] = useState(value);
    const ref = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const handler = setTimeout(() => {
          setDebouncedValue(value);
        }, 500);
    
        return () => {
          clearTimeout(handler);
        };
      }, [value]);


    useEffect(() => {
        if (debouncedValue) {
            onInputChange(value)
        }
      }, [debouncedValue]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsVisible(e.target.value.length > 0 ? true : false)
        setValue(e.target.value)
    }

    const handleSelect = (item: string) => {
        setIsVisible(false)
        setValue(item)
        onSelect(item)
    }

  return (
    <>
        <form onSubmit={(event) =>{
            event.preventDefault()
            if(ref.current){
                setIsVisible(false)
                onSearch(ref.current.value)
            }
        }}>
        <InputGroup>
            <InputLeftElement children={<BsSearch />} />
            <Input 
                ref={ref}
                borderRadius={10}
                value={value}
                onChange={handleChange}
                placeholder={placeholderText}
                variant='filled' />
        </InputGroup>
        <ThemedBorderedBox display={isVisible ? 'block' : 'none'} marginTop={1}>
            <List>
                {items.map((item, index) => (
                    <ListItem
                        style={{cursor: 'pointer'}}
                        onClick={() => handleSelect(item)} 
                        key={index}>{item}
                    </ListItem>
                ))}
            </List>
        </ThemedBorderedBox>
        </form>
    </>
  )
}

export default AutoCompleteSearch