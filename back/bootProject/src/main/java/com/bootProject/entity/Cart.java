package com.bootProject.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Table(name = "cart")
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Cart extends Base{

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member memberId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private Item itemId;

    private long quantity;

    public void updateQuantity(String flag, int quantity) {
        if("increse".equals(flag)) {
            this.quantity = this.quantity + quantity;
        } else {
            this.quantity = this.quantity - quantity;
        }
    }

}
