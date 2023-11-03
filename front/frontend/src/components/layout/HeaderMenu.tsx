

const HeaderMenu = () => {

    return (
        <>
            <div style={{height:'80px' , backgroundColor:'white', display:"flex", justifyContent:'center', borderTop:'1px solid black'}}>
                <div style={{ width:'80%', backgroundColor:'white', display:"flex", justifyContent:'center' }}>
                    <div style={{ width:'20%', backgroundColor:'white', color:'black', display:"flex", justifyContent:'center'}}> 
                        <div style={{ display:'flex', alignItems:'center' }}>
                            <div>메뉴1</div>
                            {/* <img src="/images/puppy.png" style={{width: '50px', height: '50px', cursor:'pointer'}}/> */}
                        </div>
                    </div>
                    <div style={{ width:'20%', backgroundColor:'white', color:'black', display:"flex", justifyContent:'center' }}>
                        <div style={{ display:'flex', alignItems:'center' }}>
                            <div>메뉴2</div>
                        </div>
                    </div>
                    <div style={{ width:'20%', backgroundColor:'white', color:'black', display:"flex", justifyContent:'center' }}>
                        <div style={{ display:'flex', alignItems:'center' }}>
                            <div>메뉴3</div>
                        </div>
                    </div>
                    <div style={{ width:'20%', backgroundColor:'white', color:'black', display:"flex", justifyContent:'center' }}>
                        <div style={{ display:'flex', alignItems:'center' }}>
                            <div>메뉴4</div>
                        </div>
                    </div>
                    <div style={{ width:'20%', backgroundColor:'white', color:'black', display:"flex", justifyContent:'center' }}>
                        <div style={{ display:'flex', alignItems:'center' }}>
                            <div>메뉴5</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeaderMenu;