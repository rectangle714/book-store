import { useNavigate, useLocation } from "react-router-dom";

const HeaderMenu = () => {
    const navigate = useNavigate();

    return (
        <>
            <div style={{height:'80px' , backgroundColor:'white', display:"flex", justifyContent:'center'}}>
                <div style={{ width:'80%', backgroundColor:'white', display:"flex", justifyContent:'center' }}>
                    <div style={{ width:'20%', backgroundColor:'white', color:'black', display:"flex", justifyContent:'center'}}> 
                        <div style={{ display:'flex', alignItems:'center' }}>
                            <div style={{cursor:'pointer'}} onClick={() =>navigate('/itemList',{state : '/best'})}>베스트</div>
                            {/* <img src="/images/puppy.png" style={{width: '50px', height: '50px', cursor:'pointer'}}/> */}
                        </div>
                    </div>
                    <div style={{ width:'20%', backgroundColor:'white', color:'black', display:"flex", justifyContent:'center' }}>
                        <div style={{ display:'flex', alignItems:'center' }}>
                            <div style={{cursor:'pointer'}} onClick={() =>navigate('/itemList',{state : '/novel'})}>소설</div>
                        </div>
                    </div>
                    <div style={{ width:'20%', backgroundColor:'white', color:'black', display:"flex", justifyContent:'center' }}>
                        <div style={{ display:'flex', alignItems:'center' }}>
                            <div style={{cursor:'pointer'}} onClick={() =>navigate('/itemList',{state : '/selfImprovement'})}>자기계발</div>
                        </div>
                    </div>
                    <div style={{ width:'20%', backgroundColor:'white', color:'black', display:"flex", justifyContent:'center' }}>
                        <div style={{ display:'flex', alignItems:'center' }}>
                            <div style={{cursor:'pointer'}} onClick={() =>navigate('/itemList',{state : '/humanities'})}>인문</div>
                        </div>
                    </div>
                    <div style={{ width:'20%', backgroundColor:'white', color:'black', display:"flex", justifyContent:'center' }}>
                        <div style={{ display:'flex', alignItems:'center' }}>
                            <div style={{cursor:'pointer'}} onClick={() =>navigate('/itemList',{state : '/essay'})}>에세이</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeaderMenu;