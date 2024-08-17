package com.AeiselDev.TunisiCart.controllers;

import com.AeiselDev.TunisiCart.common.ItemRequest;
import com.AeiselDev.TunisiCart.entities.Item;
import com.AeiselDev.TunisiCart.entities.User;
import com.AeiselDev.TunisiCart.services.AdminService;
import com.AeiselDev.TunisiCart.services.ItemService;
import com.AeiselDev.TunisiCart.services.PublicService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/public")
@RequiredArgsConstructor
@Tag(name ="public")
public class PublicController {

    private final ItemService itemService;
    private final AdminService adminService;
    private final PublicService publicService;

    @GetMapping("/items")
    public ResponseEntity<List<Item>> getAllItems() {
        List<Item> items = itemService.getAllItems();
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @GetMapping("items/{id}")
    public ResponseEntity<Item> getItemById(@PathVariable Long id) {
        Optional<Item> item = itemService.getItemById(id);
        return item.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }




    @GetMapping("items/search")
    public ResponseEntity<List<Item>> searchItems(@RequestParam String query) {
        List<Item> items = itemService.searchItems(query);
        return new ResponseEntity<>(items, HttpStatus.OK);
    }


    @GetMapping("/sellers")
    public ResponseEntity<?> getAllSellers() {
        return ResponseEntity.ok(publicService.getAllSellers());
    }


}
