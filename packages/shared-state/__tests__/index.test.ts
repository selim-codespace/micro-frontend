import { appStateManager, eventBus, setUser, setTheme, addNotification, removeNotification, setLoading, initialState } from '../index';

describe('Shared State', () => {
  describe('AppStateManager', () => {
    it('should initialize with correct initial state', () => {
      const state = appStateManager.getState();
      expect(state).toEqual(initialState);
    });

    it('should update state correctly', () => {
      const newUser = { id: '1', name: 'John Doe', email: 'john@example.com', role: 'user' };
      setUser(newUser);
      
      const state = appStateManager.getState();
      expect(state.user).toEqual(newUser);
    });

    it('should subscribe to state changes', () => {
      const callback = jest.fn();
      const unsubscribe = appStateManager.subscribe(callback);
      
      const newUser = { id: '1', name: 'John Doe', email: 'john@example.com', role: 'user' };
      setUser(newUser);
      
      expect(callback).toHaveBeenCalledWith(expect.objectContaining({ user: newUser }));
      
      unsubscribe();
    });
  });

  describe('EventBus', () => {
    it('should emit and listen to events', () => {
      const callback = jest.fn();
      eventBus.on('test-event', callback);
      
      eventBus.emit('test-event', { data: 'test' });
      
      expect(callback).toHaveBeenCalledWith({ data: 'test' });
      
      eventBus.off('test-event', callback);
    });

    it('should remove event listeners', () => {
      const callback = jest.fn();
      eventBus.on('test-event', callback);
      eventBus.off('test-event', callback);
      
      eventBus.emit('test-event', { data: 'test' });
      
      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe('Helper Functions', () => {
    beforeEach(() => {
      // Reset state before each test
      appStateManager.setState(initialState);
    });

    it('should set theme correctly', () => {
      setTheme('dark');
      
      const state = appStateManager.getState();
      expect(state.theme).toBe('dark');
    });

    it('should add and remove notifications', () => {
      const notification = { title: 'Test', message: 'Test message', type: 'info' as const };
      addNotification(notification);
      
      let state = appStateManager.getState();
      expect(state.notifications.length).toBe(1);
      expect(state.notifications[0]).toMatchObject(notification);
      
      const notificationId = state.notifications[0].id;
      removeNotification(notificationId);
      
      state = appStateManager.getState();
      expect(state.notifications.length).toBe(0);
    });

    it('should set loading state', () => {
      setLoading(true);
      
      const state = appStateManager.getState();
      expect(state.isLoading).toBe(true);
    });
  });
});