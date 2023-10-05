import './layout.scss'
const AuthLayout = ({
    children
} : {
    children: React.ReactNode
}) => {
    return ( 
        <div className="auth">
            {children}
        </div>
     );
}
 
export default AuthLayout;