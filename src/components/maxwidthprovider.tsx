export default function MaxWidthProvider({children , className}:{children:React.ReactNode , className?: string}){
    return(
        <div className={`max-w-6xl ${className} mx-auto`}>
            {children}
        </div>
    )
}