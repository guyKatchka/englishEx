import React from 'react';

export function renderWordsList(words: any){
    return (
        <ul style={{listStyleType: 'none'}}>
            {words.map((wordObject: any) => 
                <li key={wordObject.eng}>
                    {wordObject.eng} - {wordObject.heb}
                </li>
                )}
        </ul>
    );        
}
