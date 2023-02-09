import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NameStringComponent, SVGComponent } from '.'
import CustomizedDialogs from '../Dialog/Dialog'





export default function VisualPreviewPopup({
    show,
    handleClose,
    nameString,
    svgData
}) {
    const sns = useSelector((s) => s.listStore.globalSNS);





    return (
        <CustomizedDialogs
            open={show}
            onClose={handleClose}
            title="Visual definition of Anatomic Site"
            body={
                <div style={{ padding: '20px' }}>
                    <NameStringComponent nameString={nameString} sns={sns} />
                    <div style={{ margin: '20px auto' }}>
                        <SVGComponent data={svgData} width={300} height={300} />

                    </div>
                </div>
            }
        />
    )
}
