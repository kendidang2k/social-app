import React from 'react'

export default function MessageBox() {
    return (
        <div>MessageBox</div>
    )
}


MessageBox.getLayout = function PageLayout(page) {
    return (
        <>
            {page}
        </>
    )
}
