export default ({ label, children }) => {
    return (
        <div className="row">
            <div className="label">{label}</div>
            {children}
        </div>
    )
}