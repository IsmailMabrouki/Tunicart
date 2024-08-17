package com.AeiselDev.TunisiCart.repositories;

import com.AeiselDev.TunisiCart.entities.Cart;
import com.AeiselDev.TunisiCart.entities.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    List<CartItem> findByCart(Cart cart);
    // You can define custom query methods here if needed
}
