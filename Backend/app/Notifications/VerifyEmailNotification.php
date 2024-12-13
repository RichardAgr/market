<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class VerifyEmailNotification extends Notification
{
    public $verificationCode;

    public function __construct($verificationCode)
    {
        $this->verificationCode = $verificationCode;
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->greeting('Hola!')
            ->subject('Verificación de correo electrónico')
            ->line('Su código de verificación en su email es el siguiente:.')
            ->line("Código: {$this->verificationCode}")
            ->line('Gracias por usar nuestra aplicación!');
    }

    public function via($notifiable)
    {
        return ['mail'];
    }
}
