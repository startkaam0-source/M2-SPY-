<?php
declare(strict_types=1);

function get_razorpay_keys(): array {
    return [
        'key_id' => getenv('RAZORPAY_KEY_ID') ?: '',
        'key_secret' => getenv('RAZORPAY_KEY_SECRET') ?: ''
    ];
}

function create_razorpay_order(int $amountPaise, string $receipt): array {
    // Stub: Make an API request to Razorpay Orders API with credentials.
    return [
        'id' => 'order_stub_123',
        'amount' => $amountPaise,
        'currency' => 'INR',
        'receipt' => $receipt,
        'status' => 'created'
    ];
}

