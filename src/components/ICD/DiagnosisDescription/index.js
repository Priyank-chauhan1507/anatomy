import React, { useEffect } from 'react'
import { useDiagnosis } from '../../../hooks/useDiagnosis'

export const DiagnosisDescription = ({ icd,setCopyData }) => {
    const { data, isLoaded } = useDiagnosis(icd)

    useEffect(()=>{
        if(isLoaded) {
            //eslint-disable-next-line
            setCopyData(prev=>[...prev,data.diagnosis + "(" + icd + ")" + " - " + data.description])
        }
        //eslint-disable-next-line
    },[isLoaded])
    
    return (
        isLoaded && <div style={{ marginBottom: '30px' }}>
            <span style={{ fontWeight: 600 }}>{data.diagnosis}({icd})</span>&nbsp;-&nbsp;
            {data.description}
        </div>
    )
}