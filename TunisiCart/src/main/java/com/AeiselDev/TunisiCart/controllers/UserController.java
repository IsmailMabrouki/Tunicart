package com.AeiselDev.TunisiCart.controllers;


import com.AeiselDev.TunisiCart.common.CartItemRequest;
import com.AeiselDev.TunisiCart.common.FeedbackRequest;
import com.AeiselDev.TunisiCart.common.FeedbackResponse;
import com.AeiselDev.TunisiCart.common.OrderRequest;
import com.AeiselDev.TunisiCart.entities.Feedback;
import com.AeiselDev.TunisiCart.entities.Item;
import com.AeiselDev.TunisiCart.exception.ItemNotFoundException;
import com.AeiselDev.TunisiCart.exception.UserNotFoundException;
import com.AeiselDev.TunisiCart.services.*;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("user")
@Tag(name = "user")
public class UserController {

    private final CartService cartService;
    private final OrderService orderService;
    private final ItemService itemService;
    private final FeedbackService feedbackService;


    // Profile Endpoints
//
//    @GetMapping("/profile/{userId}")
//    public ResponseEntity<?> getProfile(@PathVariable Long userId) {
//        return ResponseEntity.ok(profileService.getProfile(userId));
//    }
//
//    @PutMapping("/profile/{userId}")
//    public ResponseEntity<?> updateProfile(@PathVariable Long userId, @RequestBody User profile) {
//        profileService.updateProfile(userId, profile);
//        return ResponseEntity.ok("Profile updated successfully");
//    }

    // Cart Endpoints

    @GetMapping("/cart/{UserId}")
    public ResponseEntity<?> getCart(@PathVariable Long UserId) {
        return ResponseEntity.ok(cartService.getCart(UserId));
    }

    @PostMapping("/cart/items/{userId}")
    public ResponseEntity<?> addItemToCart(@PathVariable Long userId, @RequestBody CartItemRequest cartItemRequest) {
        try {
            cartService.addItemToCart(userId, cartItemRequest.getItemId(), cartItemRequest.getQuantity());
            return ResponseEntity.ok(Map.of("message", "Item added to cart"));
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "User not found"));
        } catch (ItemNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Item not found"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "An error occurred"));
        }
    }


    @PutMapping("/cart/items/{id}")
    public ResponseEntity<?> updateCartItem(@PathVariable Long id, @RequestBody CartItemRequest cartItemRequest) {
        cartService.updateCartItem(id, cartItemRequest.getItemId(), cartItemRequest.getQuantity());
        return ResponseEntity.ok("Cart item updated");
    }

    @DeleteMapping("/cart/items/{CartItem_id}")
    public ResponseEntity<?> removeItemFromCart(@PathVariable Long CartItem_id) {
        cartService.removeItemFromCart(CartItem_id);
        return ResponseEntity.ok("Item removed from cart");
    }

    // Orders Endpoints

    @PostMapping("/orders")
    public ResponseEntity<Map<String, Object>> placeOrder(@RequestBody OrderRequest request) {
        try {
            orderService.placeOrder(request);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Order placed successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", "Failed to place order");

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }


    @GetMapping("/orders/{userId}")
    public ResponseEntity<?> getOrderHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(orderService.getOrderHistory(userId));
    }

    @GetMapping("/orders/{id}")
    public ResponseEntity<?> getOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrderById(id));
    }

    // Item Browsing Endpoints

    @GetMapping("/items")
    public ResponseEntity<?> getAllItems() {
        return ResponseEntity.ok(itemService.getAllItems());
    }

    @GetMapping("/items/{id}")
    public ResponseEntity<?> getItemById(@PathVariable Long id) {
        return ResponseEntity.ok(itemService.getItemById(id));
    }

    @GetMapping("/items/search")
    public ResponseEntity<?> searchItems(@RequestParam String query) {
        return ResponseEntity.ok(itemService.searchItems(query));
    }


    @PostMapping("/items/{itemId}/feedback")
    public ResponseEntity<Feedback> saveFeedbackForItem(@PathVariable Long itemId, @RequestBody FeedbackRequest feedbackRequest) {
        Feedback savedFeedback = feedbackService.saveFeedback(itemId, feedbackRequest);
        return new ResponseEntity<>(savedFeedback, HttpStatus.CREATED);
    }

    @GetMapping("/items/{itemId}/feedback")
    public ResponseEntity<List<FeedbackResponse>> getFeedbackByItemId(@PathVariable Long itemId) {
        List<FeedbackResponse> feedbackList = feedbackService.getFeedbackByItemId(itemId);
        if (feedbackList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(feedbackList, HttpStatus.OK);
    }

    @DeleteMapping("/items/{itemId}/feedback")
    public ResponseEntity<Void> deleteItemFeedback(@PathVariable Long itemId) {
        feedbackService.deleteFeedback(itemId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
