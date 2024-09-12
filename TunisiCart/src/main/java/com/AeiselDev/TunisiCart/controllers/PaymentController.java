package com.AeiselDev.TunisiCart.controllers;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentConfirmParams;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@Tag(name = "Payment")
@RequestMapping("/payment")
public class PaymentController {

    static {
        Stripe.apiKey = "sk_test_51Ppsj2COFGM2o2umdwzGrDznXucP4GQEZmeLTrFaVm8S38q0KCIbpBxPcw6Bf14ofEFNDo7TMrW0QijlQ2BG0hdi00FhyXWIFi";
    }

    @PostMapping("/create-payment-intent")
    public ResponseEntity<Map<String, Object>> createPaymentIntent(@RequestBody Map<String, Object> paymentInfo) {
        try {
            Map<String, Object> params = new HashMap<>();
            params.put("amount", paymentInfo.get("amount")); // Amount in the smallest currency unit, e.g., cents for USD
            params.put("currency", "usd");
            params.put("payment_method_types", new String[]{"card"});

            // Create the PaymentIntent
            PaymentIntent paymentIntent = PaymentIntent.create(params);

            // Send the client secret to the frontend
            Map<String, Object> responseData = new HashMap<>();
            responseData.put("clientSecret", paymentIntent.getClientSecret());

            return ResponseEntity.ok(responseData);

        } catch (StripeException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/confirm-payment-intent")
    public ResponseEntity<Map<String, Object>> confirmPaymentIntent(@RequestBody Map<String, Object> confirmInfo) {
        String paymentIntentId = (String) confirmInfo.get("paymentIntentId");
        String paymentMethodId = (String) confirmInfo.get("paymentMethodId");

        try {
            PaymentIntentConfirmParams params = PaymentIntentConfirmParams.builder()
                    .setPaymentMethod(paymentMethodId)
                    .build();

            PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentId);
            paymentIntent = paymentIntent.confirm(params);

            Map<String, Object> responseData = new HashMap<>();
            responseData.put("status", paymentIntent.getStatus());

            return ResponseEntity.ok(responseData);

        } catch (StripeException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
