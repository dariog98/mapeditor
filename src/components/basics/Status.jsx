const Status = ({ status }) => {
    return (
        <div className='position-relative bg-body-secondary overflow-hidden rounded-1' style={{ height: '1rem', width: '200px' }}>
            <div
                className='h-100 position-absolute bg-primary'
                style={{ width: `${status ? status * 100 : 0}%` }}
            />
        </div>
    )
}

export default Status