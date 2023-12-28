

const HeaderMenu = () => {

    return (
        <>
            <div style={{height:'80px' , backgroundColor:'white', display:"flex", justifyContent:'center'}}>
                <div style={{ width:'80%', backgroundColor:'white', display:"flex", justifyContent:'center' }}>
                    <div style={{ width:'20%', backgroundColor:'white', color:'black', display:"flex", justifyContent:'center'}}> 
                        <div style={{ display:'flex', alignItems:'center' }}>
                            <div style={{cursor:'pointer'}}>베스트</div>
                            {/* <img src="/images/puppy.png" style={{width: '50px', height: '50px', cursor:'pointer'}}/> */}
                        </div>
                    </div>
                    <div style={{ width:'20%', backgroundColor:'white', color:'black', display:"flex", justifyContent:'center' }}>
                        <div style={{ display:'flex', alignItems:'center' }}>
                            <div style={{cursor:'pointer'}}>소설</div>
                        </div>
                    </div>
                    <div style={{ width:'20%', backgroundColor:'white', color:'black', display:"flex", justifyContent:'center' }}>
                        <div style={{ display:'flex', alignItems:'center' }}>
                            <div style={{cursor:'pointer'}}>자기계발</div>
                        </div>
                    </div>
                    <div style={{ width:'20%', backgroundColor:'white', color:'black', display:"flex", justifyContent:'center' }}>
                        <div style={{ display:'flex', alignItems:'center' }}>
                            <div style={{cursor:'pointer'}}>인문</div>
                        </div>
                    </div>
                    <div style={{ width:'20%', backgroundColor:'white', color:'black', display:"flex", justifyContent:'center' }}>
                        <div style={{ display:'flex', alignItems:'center' }}>
                            <div style={{cursor:'pointer'}}>에세이</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeaderMenu;