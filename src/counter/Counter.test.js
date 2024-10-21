import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Counter } from './Counter';

describe('Counter', () => {
    it('should show initial value of counter', () => {
        const { getByTestId } = render(<Counter initialCount={0} />);
        const countValue = Number(getByTestId('count').textContent);
        console.log('countValue', countValue);
        expect(countValue).toEqual(0); 
    });

    it('when user click on increment button value should be increased by one ', ()=>{
        const { getByRole, getByTestId } = render(<Counter initialCount={0} />);
        const incrementBtn = getByRole('button', {name:"INCREMENT"});
        fireEvent.click(incrementBtn);
        const countVal = Number( getByTestId(('count')).textContent);
        expect(countVal).toEqual(1)
    })
});
