<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ForgetEmailNotification extends Notification
{
    public $resetPasswordLink;

    public function __construct($resetPasswordLink)
    {
        $this->resetPasswordLink = $resetPasswordLink;
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->greeting('Hola!')
            ->subject('Recuperación de contraseña')
            ->line('Hemos recibido una solicitud para restablecer su contraseña.')
            ->action('Restablecer Contraseña', $this->resetPasswordLink)
            ->line('Si no solicitó esto, puede ignorar este correo electrónico.')
            ->line('Gracias por usar nuestra aplicación!');
    }

    public function via($notifiable)
    {
        return ['mail'];
    }
}
