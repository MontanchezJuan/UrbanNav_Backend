package com.urbanNav.security.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.urbanNav.security.Models.CreditCard;

public interface CreditCardRepository extends MongoRepository<CreditCard, String> {
}