package com.careerquest.backend.common.cqrs.interfaces.commands;

import java.util.concurrent.CompletableFuture;

/**
 * Represents a command bus.
 */
public interface ICommandBus<CommandBase extends ICommand> {
    /**
     * Executes a command.
     * 
     * @param command The command to execute.
     */
    <T extends CommandBase, R> CompletableFuture<R> execute(T command);
}
