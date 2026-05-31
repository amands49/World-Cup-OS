export default function AlertFeed({alerts}){
    return(
        <div style={{
            backgroundColor:'#111111',
            border:'1px solid #FFD700',
            borderRadius:'8px',
            padding:'24px',
        }}>
            <h2 style={{color:'#FFD700',fontSize:'18px',marginBottom:'16px'}}>
                ACTIVE ALERTS
            </h2>
            {alerts.length===0 ? (
                <p style={{color:'#666666'}}>No active alerts</p>
            ):(
                <div>
                {alerts.map((alert,index) => (
                <div key={index} style={{
                    backgroundColor:'#1a1a2e',
                    borderLeft:'4px solid ${alert.color}',
                    padding:'12px',
                    marginBottom:'8px',
                    borderRadius:'4px',
                }}>
                    <p style={{color:alert.color,fontSize:'14px',fontWeight:'bold'}}>
                        {alert.level}
                    </p>
                    <p style={{color:'#ffffff',marginTop:'4px',fontsize:'14px'}}>
                        {alert.message}
                    </p>
                    </div>
            
            ))}
        </div>
    )}
    </div>
    )
    }