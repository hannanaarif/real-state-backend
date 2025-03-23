// Dependency Injection Container
import { OfferRepository } from '../repositories/OfferRepository.js';
import { TransactionRepository } from '../repositories/TransactionRepository.js';
import { OfferService } from '../services/OfferService.js';
import { TransactionService } from '../services/TransactionService.js';

// Initialize repositories
const offerRepository = new OfferRepository();
const transactionRepository = new TransactionRepository();

// Initialize services with their dependencies
const offerService = new OfferService(offerRepository);
const transactionService = new TransactionService(transactionRepository);

export {
    offerService,
    transactionService
};