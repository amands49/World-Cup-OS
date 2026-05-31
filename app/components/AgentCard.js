export default function AgentCard({icon,title,status,level,color}){
    return(
        <div style={{
            backgroundColor:'#111111',
            border: '1px solid ${color}',
            padding: '24px',
            borderRadius:'8px',
            flex:1,
        }}>
        <div style={{fontSize:'32px'}}>{icon}</div>
        <h3 style={{color:'#888888',fontSize:'12px',marginTop:'8px'}}>
        {title}
        </h3>
        <p style={{color:color,fontsize:'24px',fontWeight:'bold',marginTop:'4px'}}>
        {level}
        </p>
        <p style={{color:'#666666',fontsize:'24px',marginTop:'4px'}}>
            {status}
        </p>
        </div>
    )
}