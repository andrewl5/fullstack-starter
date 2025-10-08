package com.starter.fullstack.dao;

import com.starter.fullstack.api.Inventory;
import java.util.List;
import javax.annotation.Resource;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.ClassRule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.test.context.junit4.SpringRunner;
import org.testcontainers.containers.MongoDBContainer;
import org.testcontainers.utility.DockerImageName;

/**
 * Test Inventory DAO.
 */
@DataMongoTest
@RunWith(SpringRunner.class)
public class InventoryDAOTest {
  @ClassRule
  public static final MongoDBContainer mongoDBContainer = new MongoDBContainer(DockerImageName.parse("mongo:4.0.10"));

  @Resource
  private MongoTemplate mongoTemplate;
  private InventoryDAO inventoryDAO;
  private static final String NAME = "Amber";
  private static final String PRODUCT_TYPE = "hops";

  //What happens before running the unit test. Creates an empty collection inside the database.
  @Before
  public void setup() {
    this.inventoryDAO = new InventoryDAO(this.mongoTemplate);
  }

  //What happens after the test finishes. Drops the collection, basically deleting it.
  //This is because we want to run each unit test with a fresh collection.
  @After
  public void tearDown() {
    this.mongoTemplate.dropCollection(Inventory.class);
  }

  /**
   * Test Find All method.
   */
  @Test
  public void findAll() {
    //Tests the findall() method in InventoryDAO.java.
    //findall() should return all objects in the collection with the inventory class.
    //Tests to make sure that findall() correctly returns all inventory object instances.
    Inventory inventory = new Inventory();
    inventory.setName(NAME);
    inventory.setProductType(PRODUCT_TYPE);
    this.mongoTemplate.save(inventory);
    List<Inventory> actualInventory = this.inventoryDAO.findAll();

    //The collection shouldn't be empty if it worked.
    Assert.assertFalse(actualInventory.isEmpty());
  }

  @Test
  public void create() {
    //Tests the create() method in InventoryDAO.java.
    //create() should add the given inventory class object into the collection.
    //Tests to make sure that create has successfully stored the inventory object.
    Inventory newInventory = new Inventory();
    newInventory.setName(NAME);
    newInventory.setProductType(PRODUCT_TYPE);

    this.inventoryDAO.create(newInventory);
    List<Inventory> actualInventory = this.inventoryDAO.findAll();

    //Checks to see if create() successfully added the inventory object into the collection.
    //If successful, actualInventory shouldn't be empty.
    Assert.assertEquals(1, actualInventory.size());
  }

}
