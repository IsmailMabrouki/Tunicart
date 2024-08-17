package com.AeiselDev.TunisiCart.repositories;

import com.AeiselDev.TunisiCart.entities.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

    List<Feedback> findByItemId(Long itemId);
}
