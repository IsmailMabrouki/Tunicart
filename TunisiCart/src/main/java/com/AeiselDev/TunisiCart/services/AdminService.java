package com.AeiselDev.TunisiCart.services;

import com.AeiselDev.TunisiCart.entities.User;
import com.AeiselDev.TunisiCart.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final PurchaseOrderRepository orderRepository;
    private final FeedbackRepository feedbackRepository;
    private final  ItemRepository itemRepository;

    // Retrieve all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Retrieve a user by ID
    public User getUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            return user.get();
        } else {
            throw new RuntimeException("User not found with ID: " + id);
        }
    }

    // Update user information
    public void updateUser(Long id, User user) {
        if (userRepository.existsById(id)) {
            user.setId(id); // Ensure the user ID is set for the update
            userRepository.save(user);
        } else {
            throw new RuntimeException("User not found with ID: " + id);
        }
    }

    // Delete a user by ID
    public void deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
        } else {
            throw new RuntimeException("User not found with ID: " + id);
        }
    }

    // Get system statistics (e.g., user count, system health, etc.)
    public Object getSystemStats() {
        // Implement your logic to gather and return system statistics
        // Example: return some mock data for demonstration purposes
        return new Object() {
            public int getUserCount() {
                return (int) userRepository.count();
            }

            public int getCartCount() {
                return (int) cartRepository.count();
            }

            public int getOrderCount() {
                return (int) orderRepository.count();
            }


            public int getFeedbackCount() {
                return (int) feedbackRepository.count();
            }

            public int getItemCount() {
                return (int) itemRepository.count();
            }

            // Add more statistics as needed
        };
    }
}
