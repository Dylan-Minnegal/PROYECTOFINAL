<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OrderMail extends Mailable
{
    use Queueable, SerializesModels;

    public $orderDetails;

    public function __construct($orderDetails)
    {
        $this->orderDetails = $orderDetails;
    }

    public function build()
    {
        return $this->subject('Detalles de tu pedido')
                    ->markdown('emails.order')
                    ->with('orderDetails', $this->orderDetails);
    }
}
