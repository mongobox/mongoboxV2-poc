<?php

namespace Tests\JukeboxBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\BrowserKit\Cookie;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;

/**
 * Class DefaultControllerTest
 * @package Tests\JukeboxBundle\Controller
 */
class DefaultControllerTest extends WebTestCase
{
    private $client = null;

    public function setUp()
    {
        $this->client = static::createClient();
    }

    /**
     * Test Live Page
     */
    public function testIndex()
    {
        $this->logIn();

        $crawler = $this->client->request('GET', '/live');

        $this->assertEquals(200, $this->client->getResponse()->getStatusCode());
        $this->assertContains('JukeboxBundle::Hello World!', $crawler->filter('body')->text());
    }

    private function logIn()
    {
        $session = $this->client->getContainer()->get('session');

        // the firewall context (defaults to the firewall name)
        $firewall = 'main';

        $token = new UsernamePasswordToken('user', null, $firewall, array('ROLE_USER'));
        $session->set('_security_' . $firewall, serialize($token));
        $session->save();

        $cookie = new Cookie($session->getName(), $session->getId());
        $this->client->getCookieJar()->set($cookie);
    }

}
