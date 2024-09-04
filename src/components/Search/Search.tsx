import React from 'react';
import debounce from 'lodash.debounce';
import styles from './Search.module.scss';

type SearchProps = {
    setSearchValue: any;
}

const Search: React.FC<SearchProps> = ({ setSearchValue }) => {
    const [value, setValue] = React.useState('');
    const inputRef = React.useRef<HTMLInputElement>(null);

    const updatedSearchValue = React.useCallback(debounce(e => setSearchValue(e), 350), []);

    function onChangeSearch(e: any) {
        setValue(e.target.value);
        updatedSearchValue(e.target.value);
    }

    function searchClear() {
        setValue('');
        setSearchValue('');
        inputRef.current?.focus(); //on input clear the cursor remain in the input field
    }

    return (
        <div className={styles.input__block}>
            <img className={styles.icon} src="img/search_icon.svg" alt="Search icon" />
            <input ref={inputRef} value={value} onChange={onChangeSearch} className={styles.input} placeholder='Search' />
            {value && <img onClick={searchClear} className={styles.closeIcon} src="img/close_icon.svg" alt="Close icon" />}
        </div>
    )
}

export default Search;