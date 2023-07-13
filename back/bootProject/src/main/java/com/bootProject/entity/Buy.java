package com.bootProject.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;

@Entity
@Getter
@Table(name = "buy")
public class Buy extends Base{

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "buy_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
    
    private String res_name;    //받은사람이름
    private String res_address; //받는사람 주소
    private String res_phone;   //받는 사람 핸드폰번호
    private String res_requirement; //받는사람 요청사항
    private Long total_price;   //합계

    @Builder
    public Buy(Long id, Member member, String res_name, String res_address, String res_phone, String res_requirement, Long total_price) {
        this.id = id;
        this.member = member;
        this.res_name = res_name;
        this.res_address = res_address;
        this.res_phone = res_phone;
        this.res_requirement = res_requirement;
        this.total_price = total_price;
    }
}
